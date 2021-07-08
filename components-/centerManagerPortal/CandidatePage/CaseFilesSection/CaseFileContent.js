import RichTextEditor from 'react-rte';

export default props => (
  <div>
    <RichTextEditor
      className={"rte"}
      style={{border: 'none'}}
      value={RichTextEditor.createValueFromString(props.content, 'html')}
      // value={this.state.value}
      readOnly/>
      <style jsx>{`
        div {
          border: none;
        }
        .RichTextEditor__root___2QXK- {
          border: none;
        }
        `}</style>
  </div>
)
