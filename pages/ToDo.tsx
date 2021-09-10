import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';

const ToDo: React.FC<{todo: any, onDelete: any}> = ({todo, onDelete}) => {
    const [todoComplete, setTodoComplete] = useState<boolean>(false);
    const [textStrike, settextStrike] = useState<string>('none');

    const onCheck = () => {
        setTodoComplete(!todoComplete);
        if (textStrike === "none") {settextStrike('line-through')}
        else {settextStrike("none")}
    }

    return (
        <Accordion>
            <AccordionTab headerClassName="accordion-tab" header={<>
            <p className="todo-title" style={{textDecoration: textStrike}}>{todo.title}</p>
            <div onClick={(e) => e.stopPropagation()}>
                <Checkbox onChange={() => onCheck()} checked={todoComplete}></Checkbox>
            </div>
            <Button 
                    icon='pi pi-trash' 
                    className='p-button-danger right-button' 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete();
                }}/>
            </>}>
                <p style={{textDecoration: textStrike}}>{todo.description}</p>
            </AccordionTab>
        </Accordion>
    );
}

export default ToDo
