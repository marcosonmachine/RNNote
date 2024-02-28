import { uid } from "uid";
import Note from "../model/notes/note";

export const getTimeAgo = (updatedAt: Date): string => {
    const now = new Date();
    const diff = now.getTime() - updatedAt.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months > 0) {
        return `${months} months ago`;
    }
    if (weeks > 0) {
        return `${weeks} weeks ago`;
    }
    if (days > 0) {
        return `${days} days ago`;
    }
    if (hours > 0) {
        return `${hours} hours ago`;
    }
    if (minutes > 0) {
        return `${minutes} minutes ago`;
    }

    return 'Just now';
};

export function arraysAreEqual(arr1: Note[], arr2: Note[]): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}


export const LightColors = ['#ffffff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'];
export const DarkColors = ['#1c1c1c', '#d65c5c', '#d4af37', '#c5c500', '#3cb371', '#00bfff', '#2f4f4f', '#6a5acd', '#9932cc', '#ff69b4', '#8b4513', '#696969'];