import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPermissions, setPermissions } from './actions';
import { selectPermissions, selectCollectionTypePermissions } from '../../selectors';

const useSyncRbac = (query, collectionTypeUID) => {
  const collectionTypesRelatedPermissions = useSelector(selectCollectionTypePermissions);
  const permissions = useSelector(selectPermissions);
  const dispatch = useDispatch();

  const relatedPermissions = collectionTypesRelatedPermissions[collectionTypeUID];

  useEffect(() => {
    if (query && relatedPermissions) {
      dispatch(setPermissions(relatedPermissions, query.pluginOptions, 'listView'));

      return () => {
        dispatch(resetPermissions());
      };
    }

    return () => {};
  }, [relatedPermissions, dispatch, query]);

  return permissions;
};

export default useSyncRbac;