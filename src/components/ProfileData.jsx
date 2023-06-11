import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function ProfileData() {
  const user = useSelector((state) => state.users.user);
  const [userData, setUserData] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (user) {
      // Extract relevant user data
      const {
        id,
        firstName,
        lastName,
        email,
        country,
        dateOfBirth,
        phoneNumber,
      } = user;

      // Create an array of data objects
      const data = [
        { label: t("profile.idCode"), value: id },
        { label: t("profile.firstName"), value: firstName },
        { label: t("profile.lastName"), value: lastName },
        { label: t("login.email"), value: email },
        { label: t("profile.country"), value: country },
        { label: t("profile.dob"), value: dateOfBirth },
        { label: t("profile.phoneNumber"), value: phoneNumber },
      ];

      setUserData(data);
    }
  }, [user, i18n.language]);

  return (
    <div>
      {userData ? (
        <Table responsive>
          <tbody>
            {userData.map((item) => (
              <tr key={item.label}>
                <td>{item.label}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default ProfileData;
