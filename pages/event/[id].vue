<script setup lang="ts">
// imports
import type { Event } from "~/utils/types";
import { z } from "zod";
import type { FormSubmitEvent } from '#ui/types'

// Constants
const organizers = ['John Doe', 'Alice Smith', 'Json Bourne'];
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

/** Composables - starts */
const route = useRoute();

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

/** Handler / Utility functions - starts */

const onSubmit = (event: FormSubmitEvent<Omit<Event, "id">>): void => {
    console.log(event);
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
            <UButton type="submit">
                Submit
            </UButton>
        </div>
    </UForm>
</template>