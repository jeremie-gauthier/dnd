import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

export const useCreateLobbyForm = (
  defaultValues = {
    nbPlayers: 2,
    stageId: '',
  },
) => {
  const form = useForm({
    defaultValues,
    validatorAdapter: zodValidator,
    onSubmit: async (...args: any[]) => {
      console.log(args);
    },
  });

  return form;
};
