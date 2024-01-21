<script setup lang="ts">
    // imports
    import type { Event } from "~/utils/types";

    // Constants
    const organizers = ['John Doe', 'Alice Smith', 'Json Bourne'];
    const eventTypes = ["Conference", "Networking", "Performance"];
    const statuses = ["upcoming", "ongoing", "past"]

    // state definition
    const event: Omit<Event, "id"> = reactive({
        title: "",
        date: "",
        location: "",
        organizer: "",
        type: "",
        capacity: 1,
        status: "upcoming"
    });

    // Composables
    const route = useRoute();

    // Computed Props
    const formCaption = computed(() => {
        if (route.params.id === "create") return "Create Event";
        return 'Update Event';
    });
</script>
<template>
    <h1 class="text-3xl mb-4">{{ formCaption }}</h1>
    <UForm :state="event" class="grid grid-cols-12 gap-6">
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