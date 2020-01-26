import IPersonModel from '../../models/PeopleModels';

export default interface dialogProps {
  person: IPersonModel;
  isOpen: boolean;
  toggleDialog: () => void;
}
