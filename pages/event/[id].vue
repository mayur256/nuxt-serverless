<script setup lang="ts">
// imports
import { v4 as uuidv4 } from 'uuid';
import { z } from "zod";

// type imports
import type { FormSubmitEvent } from '#ui/types';
import type { Event } from "~/utils/types";

// loading config data
const runtimeConfig = useRuntimeConfig();

// Constants
const organizers = ['John Doe', 'Alice Smith', 'Jason Bourne'];
const eventTypes = ["Conference", "Networking", "Performance"];
const statuses = ["upcoming", "ongoing", "past"]

// state definition
const event: Omit<Event, "EventId"> = reactive({
    title: "",
    date: "",
    location: "",
    organizer: "",
    type: "",
    capacity: 1,
    status: "upcoming"
});
const isLoading = ref(false);

/** Composables - starts */
const route = useRoute();
const toast = useToast();

/** Composables - ends */

// Computed Props
const formCaption = computed(() => {
    if (route.params.id === "create") return "Create Event";
    return 'Update Event';
});

// Form validations config
const schema = z.object({
    title: z.string().min(1, "Required"),
    date: z.string().min(1, "Required"),
    location: z.string().min(1, "Required"),
    organizer: z.string().min(1, "Required"),
    type: z.string().min(1, "Required"),
    capacity: z.number(),
    status: z.string().min(1, "Required")
});

// Load data
const { data } = await useFetch(() => `${runtimeConfig.public.SERVERLESS_DOMAIN}/events/${route.params.id}`);
const fetchedEvent = (data.value as any)?.body;
event.title = fetchedEvent?.title ?? "";
event.date = fetchedEvent?.date ?? "";
event.location = fetchedEvent?.location ?? "";
event.organizer = fetchedEvent?.organizer ?? "";
event.type = fetchedEvent?.type ?? "";
event.capacity = fetchedEvent?.capacity ?? "";
event.status = fetchedEvent?.status ?? "";

/** Handler / Utility functions - starts */

const onSubmit = (event: FormSubmitEvent<Omit<Event, "EventId">>): void => {
    const payload: any = { ...event.data };
    if (route.params.id == "create") {
        payload.EventId = uuidv4();
    } else {
        payload.EventId = route.params.id;
    }

    submitEvent(payload, route.params.id == "create");
}

async function submitEvent(payload: Event, isCreate = false): Promise<void> {
    try {
        isLoading.value = true;
        const result: any = await $fetch(`${runtimeConfig.public.SERVERLESS_DOMAIN}/events`, {
            method: "POST",
            body: payload
        });
        if (result.statusCode === 200) {
            toast.add({ title: isCreate ? 'Event created!' : 'Event updated!' });
        }
    } finally {
        isLoading.value = false;
    }
}

/** Handler / Utility functions - ends */

// SEO & Meta config
useHead({ title: formCaption });
</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-3xl mb-4">{{ formCaption }}</h1>
        <NuxtLink to="/">
            <UButton label="Go Back" class="h-1/2" color="sky" />
        </NuxtLink>
    </div>

    <UForm :schema="schema" :state="event" class="grid grid-cols-12 gap-6" @submit="onSubmit">
        <UFormGroup label="Title" name="title" class="col-span-6">
            <UInput v-model="event.title" />
        </UFormGroup>

        <UFormGroup label="Date & Time" name="date" class="col-span-6">
            <UInput v-model="event.date" type="date" />
        </UFormGroup>

        <UFormGroup label="Location" name="location" class="col-span-6">
            <UInput v-model="event.location" />
        </UFormGroup>

        <UFormGroup label="Organizer" name="organizer" class="col-span-6">
            <USelect v-model="event.organizer" :options="organizers" />
        </UFormGroup>

        <UFormGroup label="Type" name="type" class="col-span-6">
            <USelect v-model="event.type" :options="eventTypes" />
        </UFormGroup>

        <UFormGroup :label="`Capacity: ` + event.capacity" name="capacity" class="col-span-6">
            <URange v-model="event.capacity" :min="1" :max="100" />
        </UFormGroup>

        <UFormGroup label="Status" name="status" class="col-span-6">
            <USelect v-model="event.status" :options="statuses" />
        </UFormGroup>

        <div class="col-span-12 flex justify-end">
            <UButton type="submit" :loading="isLoading">
                Submit
            </UButton>
        </div>
    </UForm>
</template>