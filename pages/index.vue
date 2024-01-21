<script setup lang="ts">
// Imports
import type { Event } from '~/utils/types';

// Constants
const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "date", label: "Date" },
    { key: "location", label: "Location" },
    { key: "organizer", label: "Organizer" },
    { key: "type", label: "Type" },
    { key: "capacity", label: "Capacity" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" }
];
const events: Event[] = [
    {
        "id": "1",
        "title": "Tech Summit 2024",
        "date": "2024-03-15T09:00:00.000Z",
        "location": "Convention Center, Tech City",
        "organizer": "Tech Events Co.",
        "type": "Conference",
        "capacity": 500,
        "status": "upcoming",
    },
    {
        "id": "2",
        "title": "Startup Mixer",
        "date": "2024-02-28T18:00:00.000Z",
        "location": "Innovation Hub, Startup Valley",
        "organizer": "Startup Network",
        "type": "Networking",
        "capacity": 100,
        "status": "past"
    },
    {
        "id": "3",
        "title": "Web Development Workshop",
        "date": "2024-02-10T14:30:00.000Z",
        "location": "Code Academy, Tech Town",
        "organizer": "Code Enthusiasts Club",
        "type": "Workshop",
        "capacity": 50,
        "status": "past"
    },
    {
        "id": "4",
        "title": "Art Exhibition",
        "date": "2024-04-05T10:00:00.000Z",
        "location": "Art Gallery, Cultural Center",
        "organizer": "Artistic Creations Society",
        "type": "Exhibition",
        "capacity": 200,
        "status": "upcoming"
    },
    {
        "id": "5",
        "title": "Fitness Challenge",
        "date": "2024-03-01T17:00:00.000Z",
        "location": "City Park, Health District",
        "organizer": "Fit Living Community",
        "type": "Fitness",
        "capacity": 150,
        "status": "ongoing"
    },
    {
        "id": "6",
        "title": "Music Festival",
        "date": "2024-04-20T16:00:00.000Z",
        "location": "Outdoor Amphitheater, Music City",
        "organizer": "Harmony Productions",
        "type": "Festival",
        "capacity": 1000,
        "status": "upcoming"
    },
    {
        "id": "7",
        "title": "Business Seminar",
        "date": "2024-02-15T11:30:00.000Z",
        "location": "Business Hub, Financial District",
        "organizer": "Business Leaders Forum",
        "type": "Seminar",
        "capacity": 80,
        "status": "past"
    },
    {
        "id": "8",
        "title": "Food Tasting Event",
        "date": "2024-03-08T19:00:00.000Z",
        "location": "Gourmet Hall, Culinary Village",
        "organizer": "Food Enthusiasts Club",
        "type": "Food & Drink",
        "capacity": 120,
        "status": "upcoming"
    },
    {
        "id": "9",
        "title": "Environmental Awareness Talk",
        "date": "2024-02-22T15:00:00.000Z",
        "location": "Green Space, Eco City",
        "organizer": "Eco Warriors Foundation",
        "type": "Talk",
        "capacity": 60,
        "status": "past"
    },
    {
        "id": "10",
        "title": "Dance Performance Showcase",
        "date": "2024-04-12T20:00:00.000Z",
        "location": "Dance Studio, Arts District",
        "organizer": "Dance Fusion Academy",
        "type": "Performance",
        "capacity": 180,
        "status": "upcoming"
    }
];

// SEO & Meta config
useHead({ title: "Events" });
</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl">Events</h1>
        <NuxtLink to="/event/create">
            <UButton label="Add Event" icon="i-heroicons-plus-16-solid" />
        </NuxtLink>
    </div>
    <h2>List of the all the events generated in the system</h2>

    <UTable :rows="events" :columns="columns">
        <template #actions-data="{row}">
            <div class="flex justify-between">
                <UTooltip text="Edit">
                    <NuxtLink :to="`/event/${row.id}`">
                        <UButton icon="i-heroicons-pencil-square" />
                    </NuxtLink>
                </UTooltip>

                <UTooltip text="Delete">
                    <UButton icon="i-heroicons-trash" color="red" />
                </UTooltip>
            </div>
        </template>
    </UTable>
</template>