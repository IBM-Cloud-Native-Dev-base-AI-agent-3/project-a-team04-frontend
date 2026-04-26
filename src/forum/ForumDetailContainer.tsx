import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForumDetailThunk, fetchMyRegistrationThunk, applyForumThunk } from './forumThunk';
import { clearApplyResult } from './forumSlice';
import ForumDetailComponent from './ForumDetailComponent';

interface ForumDetailContainerProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export default function ForumDetailContainer({ isLoggedIn, onLogout }: ForumDetailContainerProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const {
    currentForumDetail,
    myRegistration,
    detailLoading,
    detailError,
    applyLoading,
    applyResult,
  } = useSelector((state: any) => state.forum);

  useEffect(() => {
    if (id) {
      const forumId = Number(id);
      dispatch(fetchForumDetailThunk({ forumId }));
      if (isLoggedIn) {
        dispatch(fetchMyRegistrationThunk(forumId));
      }
    }
  }, [id, isLoggedIn, dispatch]);

  useEffect(() => {
    if (applyResult === 1) {
      alert('참가 신청이 완료되었습니다.');
      dispatch(clearApplyResult());
      if (id) dispatch(fetchMyRegistrationThunk(Number(id)));
    } else if (applyResult === -1) {
      alert('참가 신청에 실패했습니다.');
      dispatch(clearApplyResult());
    }
  }, [applyResult, id, dispatch]);

  const handleApply = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (id) {
      dispatch(applyForumThunk({ forumId: Number(id), request: { note: '' } }));
    }
  };

  return (
    <ForumDetailComponent
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
      forum={currentForumDetail}
      myRegistration={myRegistration}
      loading={detailLoading}
      error={detailError}
      onBack={() => navigate('/forum-guide')}
      onApply={handleApply}
      applyLoading={applyLoading}
    />
  );
}
