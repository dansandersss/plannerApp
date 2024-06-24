import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
  width: 60%;
`
);

const InputWrapper = styled("div")(
  ({ theme }) => `
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
	width: 100%;

  &:hover {
    border-color: #FF6767;
  }

	"& .MuiInputLabel-root": {
    color: "#ccc",
    transform: "translate(10px, 14px) scale(1)",
  },

  &.focused {
    border-color: #FF6767;
    box-shadow: 0 0 0 2px rgba(255, 103, 103, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 50px;
    box-sizing: border-box;
    padding: 4px 10px;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;

    &:focus {
      color: #000;
    }
  }
`
);

const StyledTag = styled("div")(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #FF6767;
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const TagFiller = ({ tags, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      const newTags = [...tags, inputValue.trim()];
      onChange(newTags);
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    onChange(newTags);
  };

  return (
    <Root className="w-full sm:w-[60%]">
      <InputWrapper className={inputValue ? "focused" : ""}>
        {tags.map((tag, index) => (
          <StyledTag key={index}>
            <span>{tag}</span>
            <CloseIcon onClick={() => handleDelete(index)} />
          </StyledTag>
        ))}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a tag"
        />
      </InputWrapper>
    </Root>
  );
};

export default TagFiller;
