import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { resetState } from '@/redux/features/mangaSlice';
import { useNavigation } from '@react-navigation/native';

export const useProfileService = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  function logout() {
    dispatch(resetState());
    navigation.navigate('Login');
  }

  return {
    user,
    logout,
  };
};
