import * as React from "react";

class TechCellRenderer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      value: props.value,
    };
  }

  render(){
    return (
    <div class="flex flex-wrap content-start">
      {this.state.value.map(m => (
        <img width={m.thumbnails.small.width} height={m.thumbnails.small.height} src={m.thumbnails.small.url} />
      ))}
    </div>)
  }
}

export default TechCellRenderer;