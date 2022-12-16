import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    console.log(5555);
    console.log(error);
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(66666);
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <div>
          <h2>不好意思，页面发生错误！</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            重试一次试试？
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
