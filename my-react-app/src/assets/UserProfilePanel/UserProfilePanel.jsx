import { useState } from "react"
import UserPersonalInfoContainer from "./UserPersonalnfoContainer"
import UserSettingsContainer from "./UserSettingContainer"
function UserProfilePanel({userInfo,FetchUserInformation}){

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
        <UserSettingsContainer setIsSettingDisplayed={setIsSettingDisplayed} userInfo={userInfo} FetchUserInformation={FetchUserInformation}/>
    )
}
</>    )
}
export default UserProfilePanel