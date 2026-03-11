import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
const API_URL = import.meta.env.VITE_API_BASE_URL;


// ১. ডাটার টাইপগুলো ডিক্লেয়ার করা (TypeScript-এর জন্য)
interface Notice {
    id?: number;
    title: string;
    date: string;
    content: string;
}

interface News {
    id?: number;
    title: string;
    date: string;
    image_url: string;
    summary?: string;
    description?: string;
}

interface Event {
    id?: number;
    date: string;
    month: string;
    title: string;
    time: string;
    location: string;
}

interface SlideContent {
    image_url: string;
}

// মূল ডাটার স্ট্রাকচার
interface SiteData {
    notices: Notice[];
    news: News[];
    events: Event[];
    videos: any[];
    contents: SlideContent[];
    stats: any[];
    images: any;
    titles: any;
}

// Context-এর টাইপ
interface DataContextType {
    content: SiteData | null;
    loading: boolean;
    error: string | null;
}

// ২. Context তৈরি করা
const DataContext = createContext<DataContextType | undefined>(undefined);

// ৩. Provider কম্পোনেন্ট (এটি আপনার পুরো অ্যাপকে র‍্যাপ করবে)
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<SiteData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // API কল করার ফাংশন
        const fetchSiteData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch website content');
                }
                const data = await response.json();
                setContent(data);
            } catch (err: any) {
                setError(err.message || 'Something went wrong!');
            } finally {
                setLoading(false); // ডাটা আসুক বা এরর খাক, লোডিং বন্ধ হবে
            }
        };

        fetchSiteData();
    }, []); // [] মানে শুধু একবারই কল হবে

    return (
        <DataContext.Provider value={{ content, loading, error }}>
            {children}
        </DataContext.Provider>
    );
};

// ৪. কাস্টম হুক (যাতে অন্য পেজে সহজেই ডাটা ব্যবহার করা যায়)
export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};