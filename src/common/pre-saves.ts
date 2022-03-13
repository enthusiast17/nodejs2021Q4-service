import userRepository from '../resources/users/users.memory.repository';

export const handleUserPreSave = async () => {
  const user = await userRepository.getByLogin('admin');
  if (!user) {
    await userRepository.create({
      name: 'admin',
      login: 'admin',
      password: 'admin',
    });
  }
};
