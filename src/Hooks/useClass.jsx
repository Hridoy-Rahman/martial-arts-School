import { useQuery } from 'react-query';

const useClass = (userEmail) => {
  console.log(userEmail)
  const fetchSelectedClasses = async () => {
    const res = await fetch(`http://localhost:5000/selectedClasses?user_email=${userEmail}`);
    return res.json();
  };

  const { data: selectedClasses = [], refetch } = useQuery(['selectedClasses', userEmail], fetchSelectedClasses);

  return { selectedClasses, refetch };
};

export default useClass;
