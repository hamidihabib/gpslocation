import Location from './components/Location';

const HomePage: React.FC = () => (
  <div className='p-5'>
    <h1 className="font-bold">GPS Info</h1>
    <Location />
  </div>
);

export default HomePage;
