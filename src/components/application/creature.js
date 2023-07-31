import { Link } from 'react-router-dom'
import PDFViewer from './pdf_lib'
import { CreatePDF } from "./CreatePDF";

export function Creature() {
    return (
        <div>
            <Link to='/creature' activeStyle></Link>
            <h1>Creature page</h1>
            <CreatePDF/>
        </div>
    )
}