import { useState } from "react"
import UserPersonalInfoContainer from "./UserPersonalnfoContainer"
import UserSettingsContainer from "./UserSettingContainer"
function UserProfilePanel({userInfo,FetchUserInformation,LogOut}){

    const [isSettingDisplayed, setIsSettingDisplayed] = useState(false)
    return(
<>
{
    !isSettingDisplayed?
    (
        <UserPersonalInfoContainer setIsSettingDisplayed={setIsSettingDisplayed} FetchUserInformation={FetchUserInformation} userInfo={userInfo}/>
    )
    :
    (
        <UserSettingsContainer LogOut={LogOut}  setIsSettingDisplayed={setIsSettingDisplayed} userInfo={userInfo} FetchUserInformation={FetchUserInformation}/>
    )
}
</>    )
}
export default UserProfilePanel