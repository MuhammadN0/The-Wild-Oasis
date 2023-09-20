import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateSettingsTable from '../features/settings/UpdateSettingsForm'
function Settings() {
  return <Row>
  <Heading as="h1">Update hotel settings</Heading>
  <UpdateSettingsTable/>
  </Row>
}

export default Settings;
