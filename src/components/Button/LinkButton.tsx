// import * as React from 'react';
// import { styled } from '@styled-system/jsx';
// import { button } from '@styled-system/recipes';
// import { Spinner } from '~/components/Spinner';
// import { css } from '@styled-system/css';
// import { Box } from '../Box';

// const StyledAnchor = styled('a', button);

// export interface LinkButtonProps extends React.ComponentProps<typeof StyledAnchor> {
//   variant?: 'primary' | 'standard' | 'hollow' | 'ghost' | 'cta' | 'danger';
//   size?: 'standard' | 'small' | 'large';
//   href: string;
//   className?: string;
//   children?: React.ReactNode;
//   disabled?: boolean;
//   loading?: boolean;
//   external?: boolean;
// }

// const ButtonContent = ({ loading, children }: { loading: boolean; children: React.ReactNode }) => {
//   return (
//     <>
//       <Box className={css({
//         display: 'flex',
//         alignItems: 'center',
//         gap: '2',
//         opacity: loading ? 0 : 1,
//       })}>
//         {children}
//       </Box>
//       {loading && (
//         <Box
//           className={css({
//             position: 'absolute',
//             top: '0',
//             left: '0',
//             right: '0',
//             bottom: '0',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           })}
//         >
//           <Spinner />
//         </Box>
//       )}
//     </>
//   );
// };

// export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
//   (
//     {
//       variant = 'standard',
//       size = 'standard',
//       href,
//       external,
//       className,
//       children,
//       loading,
//       disabled,
//       ...props
//     },
//     ref,
//   ) => {
//     const trulyDisabled = loading || disabled;
    
//     return (
//       <StyledAnchor
//         ref={ref}
//         href={href}
//         target={external ? '_blank' : undefined}
//         rel={external ? 'noopener noreferrer' : undefined}
//         aria-disabled={trulyDisabled}
//         className={className}
//         variant={variant}
//         size={size}
//         {...props}
//       >
//         <ButtonContent loading={loading || false}>
//           {children}
//         </ButtonContent>
//       </StyledAnchor>
//     );
//   },
// ); 