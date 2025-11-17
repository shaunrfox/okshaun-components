import React from "react";
import { Flex } from "../src/components/Box";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const storybookBox = css({
  alignItems: "center",
  justifyContent: "center",
});

const StyledFlex = styled(Flex)(storybookBox);

const StoryWrapper = function ({ children }: { children: React.ReactNode }) {
  return <StyledFlex>{children}</StyledFlex>;
};

export default StoryWrapper;
