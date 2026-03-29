import InteractionContext from './InteractionContext';
import Button from './AnalyticsButton';

const FormApp = () => {
  const context = {
    measure: (e: any, t: any) => {
      //send event and timestamp to remote
      console.log(`sending to remote server  ${e}: ${t}`);
    },
  };

  const onClick = () => {
    console.log('submit');
  };

  return (
    <InteractionContext.Provider value={context}>
      <form>
        <Button name="submit-button" onClick={onClick}>
          Submit
        </Button>
      </form>
    </InteractionContext.Provider>
  );
};

export default FormApp;
