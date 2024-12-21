import React from 'react';

interface CourseCardProps {
  imageUrl: string;
  title: string;
}

export function CourseCard({ imageUrl, title }: CourseCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow bg-background-card">
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={imageUrl} 
          alt={title}
          className="object-cover w-full h-64 transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );
}