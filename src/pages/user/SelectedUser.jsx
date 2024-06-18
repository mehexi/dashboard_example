import { Card } from '@/components/ui/card';
import { useLoaderData } from 'react-router-dom';

const SelectedUser = () => {

    const data = useLoaderData()
    console.log(data)
    
    return (
        <Card>
            <h1>hello</h1>
        </Card>
    );
};

export default SelectedUser;