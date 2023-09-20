import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';
import SpinnerMini from '../../ui/SpinnerMini';

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const { updateUser, isLoading } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName || (!avatar && fullName === currentFullName)) return;
    if (!avatar) updateUser({ fullName });
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => setAvatar(null),
      }
    );
  }
  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input disabled={isLoading} value={email} />
      </FormRow>
      <FormRow label="Full name">
        <Input
          disabled={isLoading}
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          disabled={isLoading}
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isLoading}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : 'Update account'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
