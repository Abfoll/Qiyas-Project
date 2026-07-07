import React from 'react';

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <div>This is {id}</div>;
}