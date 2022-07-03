import { FC } from 'react';
import TabsList from './components/TabsList';

const TagViews: FC = () => {
  return (
    <>
      <div className="w-full relative h-10 bg-white">
        <TabsList />
      </div>
    </>
  );
};

export default TagViews;
