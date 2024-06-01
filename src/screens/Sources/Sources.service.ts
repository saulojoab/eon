import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { updateSource } from '@/redux/features/mangaSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useSourceService = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const selectedSource = useAppSelector(state => state.manga.selectedSource);
  const dispatch = useAppDispatch();

  function handleSelectSource(source: string) {
    dispatch(updateSource(source));
  }

  function goBack() {
    navigation.goBack();
  }

  return {
    selectedSource,
    handleSelectSource,
    goBack,
  };
};
