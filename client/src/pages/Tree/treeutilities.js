import {
  useTreeQuery,
  useTreeDataMutation,
  useCreateTreeDataMutation,
} from '@/api/queries';

export async function updateOrCreateTree(id, fullData, updatedData) {
  const { isError } = useTreeQuery({ id });
  const mutateTreeData = useTreeDataMutation();
  const createTreeData = useCreateTreeDataMutation();

  if (isError) {
    await createTreeData.mutateAsync({ id, ...fullData, ...updatedData });
  } else {
    await mutateTreeData.mutateAsync({ id, ...updatedData });
  }
}
