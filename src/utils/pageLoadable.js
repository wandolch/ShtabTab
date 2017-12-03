import Loadable from 'react-loadable';
import LoadingIndicator from '../components/LoadingIndicator';

export default (name, abstract) => Loadable({
  loader: () => import(`../containers/${name}`),
  loading: abstract ? () => null : LoadingIndicator,
  delay: 300
});

