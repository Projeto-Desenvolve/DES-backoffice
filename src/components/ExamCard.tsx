import React from 'react';
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton
} from '@material-tailwind/react';
import { Copy, Edit, MoreVertical, Trash } from 'lucide-react';
import { formatDate } from '../utils/DateFormater';
import { deleteExam } from '../api/exam/delete';
import { useNavigate } from 'react-router-dom';

interface IExamCardProps {
    title: string;
    difficulty: string;
    createdAt: string;
    updatedAt?: string;
    id: string;
    handleDeleteCompleted: () => void;
}

/**
 * Renders an `ExamCard` component displaying information about an exam, including title, difficulty, and dates.
 * It also provides an interactive menu with options to edit, duplicate, or delete the exam.
 *
 * @param {IExamCardProps} props - The properties for the ExamCard component.
 * @param {string} props.title - The title of the exam.
 * @param {string} props.createdAt - The creation date of the exam.
 * @param {string} props.updatedAt - The last update date of the exam. Optional.
 * @param {string} props.difficulty - The difficulty level of the exam.
 * @param {string} props.id - The unique identifier of the exam.
 * @param {Function} props.handleDeleteCompleted - Callback function to be called after deleting an exam.
 * @returns {JSX.Element} A list item element styled as a card that displays the exam's information and a menu for actions.
 */
function ExamCard({ title, createdAt, difficulty, id, handleDeleteCompleted }: IExamCardProps): JSX.Element {
  const hoverAnimation = 'shadow-xl shadow-transparent transition-all hover:-translate-y-2 hover:shadow-blue-gray-900/5 hover:bg-[#fafafa]';

  const navigate = useNavigate();

  const [difficultyColor, setDifficultyColor] = React.useState<string>('');
  const menuItems = [
    {
      label: 'Editar',
      icon: <Edit size={20}/>
    },
    {
      label: 'Duplicar',
      icon: <Copy size={20}/>
    },
  ];

  const handleClick = (itemLabel: string, itemId: string) => {
    itemLabel == 'Editar' && navigate(`/exam/edit/${itemId}`);
  };

  React.useEffect(() => {
    difficulty == 'Fácil' && setDifficultyColor('dark:border-l-green-400 border-l-green-600');
    difficulty == 'Difícil' && setDifficultyColor('border-l-red-400 dark:border-l-red-600');
    difficulty == 'Média' && setDifficultyColor('border-l-orange-400 dark:border-l-orange-600');
  },[difficulty]);

  return (
    <>
      <li className={`flex h-fit w-full cursor-pointer items-center justify-between rounded-lg border bg-white p-2 dark:bg-blue-gray-200/20 ${hoverAnimation} border-l-8 ${difficultyColor} dark:border-blue-gray-400`}>
        <div>
          <Typography variant='lead' className='font-bold text-black dark:text-white'>{title}</Typography>

          <div className='flex gap-2'>
            <Typography variant='paragraph' className='text-black dark:text-white'>criada em: <strong>{formatDate(createdAt)}</strong></Typography>
          </div>
          <Typography variant='small' className='text-gray-500'>{id}</Typography>
        </div>
        <div>

          <Menu>
            <MenuHandler>
              <IconButton variant="text" className='dark:text-white'>
                <MoreVertical />
              </IconButton>
            </MenuHandler>
            <MenuList>
              {menuItems.map((item, index) => (

                <MenuItem
                  className='flex items-center gap-4'
                  key={index}
                  onClick={() => handleClick(item.label, id)}
                  disabled={item.label == 'Duplicar'}
                >
                  {item.icon}
                  {item.label}
                </MenuItem>

              )
              )}

              <hr className="my-3" />
              <MenuItem
                className='flex items-center justify-center gap-2 text-red-300'
                onClick={() => deleteExam({ id: id, responseCompleted: handleDeleteCompleted})}>
                <Trash size={20}/>
                    Excluir
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </li>
    </>
  );
}

export { ExamCard };
