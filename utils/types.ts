export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    organizer: string;
    type: string;
    capacity: number;
    status: 'upcoming' | 'ongoing' | 'past';
}
