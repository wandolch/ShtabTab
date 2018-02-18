import Loadable from 'react-loadable';
import LoadingIndicator from '../components/LoadingIndicator';

export default (name, loadingView) => Loadable({
  loader: () => import(`../containers/${name}`),
  loading: loadingView || LoadingIndicator,
  delay: 0
});

