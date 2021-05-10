import { Link } from 'react-router-dom';

interface IRestaurantProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImg,
  name,
  categoryName,
}) => (
  <Link to={`/restaurants/${id}`}>
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="mb-3 bg-center bg-cover py-28"
      ></div>
      <h3 className="text-xl font-medium">{name}</h3>
      <span className="py-2 mt-2 text-xs border-t border-gray-400 opacity-50">
        {categoryName}
      </span>
    </div>
  </Link>
);
