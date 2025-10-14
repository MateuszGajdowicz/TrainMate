import UserPersonalInfoContainer from "./UserPersonalnfoContainer"
import UserSettingsContainer from "./UserSettingContainer"
function UserProfilePanel({userInfo,FetchUserInformation}){
    return(
<>
<UserPersonalInfoContainer FetchUserInformation={FetchUserInformation} userInfo={userInfo}/>
<UserSettingsContainer userInfo={userInfo} FetchUserInformation={FetchUserInformation}/>
</>    )
}
export default UserProfilePanel