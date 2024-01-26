<script setup lang="ts">
// Imports
import type { Event } from '~/utils/types';

// Constants
const columns = [
    { key: "EventId", label: "ID" },
    { key: "title", label: "Title" },
    { key: "date", label: "Date" },
    { key: "location", label: "Location" },
    { key: "organizer", label: "Organizer" },
    { key: "type", label: "Type" },
    { key: "capacity", label: "Capacity" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" }
];
// loading config data
const runtimeConfig = useRuntimeConfig();

// Load data
const { data } = await useFetch(() => `${runtimeConfig.public.SERVERLESS_DOMAIN}/events/all`);
const events = (data.value as any)?.body ?? [];

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
                    <NuxtLink :to="`/event/${row.EventId}`">
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