import LaunchForm from '../components/LaunchForm'
import ProjectList from '../components/ProjectList'

export default function Dashboard() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>📊 Launch Dashboard</h1>

      <LaunchForm onCreated={() => location.reload()} />
      <ProjectList />

      <hr style={{ margin: '40px 0' }} />

      <h3>📧 Join My Email List</h3>

      <div dangerouslySetInnerHTML={{ __html: `
        <!-- BEGIN AWEBER WEB FORM CODE -->
        <form method="post" action="https://www.aweber.com/scripts/addlead.pl">
          <input type="hidden" name="listname" value="YOUR-LIST-NAME-HERE" />
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Email" />
          <input type="submit" value="Subscribe" />
        </form>
        <!-- END AWEBER FORM -->
      ` }} />
    </div>
  )
}

