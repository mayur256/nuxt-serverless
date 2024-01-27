<script setup lang="ts">
// loading config data
const runtimeConfig = useRuntimeConfig();

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

// state definition
const isLoading = ref(false);

// Composables
const toast = useToast();

// Load data
const { data } = await useFetch(() => `${runtimeConfig.public.SERVERLESS_DOMAIN}/events/all`);
let events = (data.value as any)?.body ?? [];

/** Handler functions - starts */

async function deleteEvent(eventId: string) {
    isLoading.value = true;
    try {
        const result: any = await $fetch(`${runtimeConfig.public.SERVERLESS_DOMAIN}/events/${eventId}`, {
            method: "DELETE",
        });
        toast.add({ title: result?.body });

        const { data } = await useFetch(() => `${runtimeConfig.public.SERVERLESS_DOMAIN}/events/all`);
        events = (data.value as any)?.body ?? [];
    } finally {
        isLoading.value = false;
    }
}

/** Handler functions - ends */

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

    <UTable :rows="events" :columns="columns" :loading="isLoading">
        <template #actions-data="{row}">
            <div class="flex justify-between">
                <UTooltip text="Edit">
                    <NuxtLink :to="`/event/${row.EventId}`">
                        <UButton icon="i-heroicons-pencil-square" />
                    </NuxtLink>
                </UTooltip>

                <UTooltip text="Delete">
                    <UButton icon="i-heroicons-trash" color="red" @click="deleteEvent(row.EventId)" />
                </UTooltip>
            </div>
        </template>
    </UTable>
</template>