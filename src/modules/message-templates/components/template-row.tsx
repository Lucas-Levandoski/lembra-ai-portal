import { Button, maskMinutes } from 'Common';
import { MessageTemplate, TargetIcons} from '../models';
import { BiTrash } from 'react-icons/bi';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoCopyOutline } from 'react-icons/io5';

type props = {
  template: MessageTemplate;
  index: number;
  onEdit?: (index: number) => void;
}

export function TemplateRow({ template, onEdit = () => {}, index }: props) {
  return (
    <div className="flex relative border-2 rounded-lg items-center w-full h-14 bg-gray-50">
      {
        (template.isEdited || template.isNew) && <span className="absolute h-10 w-[2px] bg-blue-700 rounded-full -translate-x-[2px]"/>
      }
      <div className="ml-6 flex items-center gap-2">
        <span>{TargetIcons[template.target]}</span>
        <span>{maskMinutes(template.timeUntil, true)} antes</span>  
        {/* <b>•</b><b>Enviar por {TargetTexts[template.target]}</b> */}
      </div>
      <div className="ml-auto mr-0 items-center">
        <Button variant="icon" onClick={() => onEdit(index)}><HiOutlineAdjustmentsHorizontal className="size-6 text-gray-600" /></Button>
        <Button variant="icon" onClick={() => {}}><IoCopyOutline  className="size-6 text-gray-600" /></Button>
        <Button variant="icon" onClick={() => {}}><BiTrash className="size-6 text-gray-600" /></Button>
      </div>  
    </div>
  );
}