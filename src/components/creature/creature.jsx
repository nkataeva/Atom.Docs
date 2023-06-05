import { Link } from 'react-router-dom';
import { CreatePDF } from "../application/CreatePDF";
import withLayout from '../../hocs/with-layout';

const Creature = () => {
    return (
        <div>
            {/* <Link to='/creature' activeStyle></Link>
            <h1>Creature page</h1> */}
            <CreatePDF/>
        </div>
    )
}

export default withLayout(Creature);