import { Link } from 'react-router';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Category } from '../api';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/products?category=${category.id}`}>
      <Card className="group overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="aspect-square overflow-hidden bg-muted">
          <ImageWithFallback
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-3 text-center">
          <span className="text-lg mr-1">{category.icon}</span>
          <p className="font-medium text-sm">{category.name}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
