import { FC } from 'react';
import TagList from './components/TagList';

const TagViews: FC = () => {
  return (
    <section className="w-full p-1 bg-white">
      <TagList />
    </section>
  );
};

export default TagViews;
