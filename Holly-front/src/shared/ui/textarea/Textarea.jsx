import styled from 'styled-components';

const TextareaContainer = ({ className, children, ...props }) => {
  return (
    <div className={className}>
      <h3>{children}</h3>
      <textarea {...props} name="" id="" cols="30" rows="10" />
    </div>
  );
};

export const Textarea = styled(TextareaContainer)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  width: 100%;
  & h3 {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 300px;
  }
  & textarea {
    resize: none;
    height: 35px;
    padding: 12px;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 8px;
    border: 1.5px solid #ccc;
    background-color: var(--white-color);
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
    color: #333;
  }
  & textarea:focus {
    outline: none;
    border-color: #323232ff;
    box-shadow: 0 0 0 2px rgba(50, 50, 50, 0.2);
  }
`;
