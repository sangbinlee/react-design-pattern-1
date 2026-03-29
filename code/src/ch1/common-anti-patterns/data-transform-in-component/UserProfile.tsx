import { useEffect, useState } from 'react';

type User = {
  name: string;
  age: number;
  address: string;
};

type RemoteUser = {
  firstName: string;
  lastName: string;
  age: number;
  addressLine1: string;
  city: string;
  country: string;
};

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/users/${userId}`)
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(
            '서버가 JSON을 반환하지 않았습니다. (백엔드 준비 안됨)',
          );
        }
        return response.json();
      })
      .then((data: RemoteUser) => {
        const transformedUser = {
          name: `${data.firstName} ${data.lastName}`,
          age: data.age,
          address: `${data.addressLine1}, ${data.city}, ${data.country}`,
        };
        setUser(transformedUser);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p>사용자 정보를 불러오는 중...</p>;
  }

  if (error) {
    return (
      <p>⚠️ 서버가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.</p>
    );
  }

  return (
    <div>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>Address: {user.address}</p>
        </>
      ) : (
        <p>사용자 정보가 없습니다.</p>
      )}
    </div>
  );
}

export default UserProfile;
