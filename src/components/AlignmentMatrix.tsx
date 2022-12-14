import { styled } from '@mui/material/styles';

const Matrix = styled('table')(() => ({
  borderCollapse: 'collapse',
  display: 'inline-block',
  margin: 0,
  textAlign: 'center',
  border: 'solid 1px #a0a0a0',
  borderSpacing: 0,
  borderWidth: '0 1px 0 0',
}));

const HeaderCell = styled('th')(() => ({
  backgroundColor: '#F3F4F1',
  border: '1px solid #a0a0a0',
  color: 'gray',
  borderWidth: '1px 0 1px 1px',
  height: '48px',
  width: '64px',
  maxHeight: '48px',
  maxWidth: '64px',
  minHeight: '48px',
  minWidth: '64px',
}));

const Cell = styled('td')(() => ({
  backgroundClip: 'padding-box',
  backgroundColor: '#FCFCFB',
  border: '1px solid #a0a0a0',
  color: 'gray',
  borderWidth: '1px 0 1px 1px',
  height: '48px',
  width: '64px',
  maxHeight: '48px',
  maxWidth: '64px',
  minHeight: '48px',
  minWidth: '64px',
}));

const SelectedCell = styled(Cell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
}));

const inInPath = (path: number[][], i: number, j: number) => (
  path.some((p) => (p[0] === i && p[1] === j))
);

interface Props {
  seq1: string;
  seq2: string;
  alignMatrix: number[][];
  path: number[][];
}

const AlignmentMatrix = (props: Props) => {
  const { alignMatrix, path } = props;
  let { seq1, seq2 } = props;
  seq1 = `\u00A0—${seq1}`;
  seq2 = `—${seq2}`;

  return (
    <Matrix>
      <thead>
        <tr>
          {seq1.split('').map((c, idx) => (
            <HeaderCell key={idx}>{c}</HeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {seq2.split('').map((c, i) => (
          <tr key={i}>
            <HeaderCell>{c}</HeaderCell>
            {alignMatrix[i]?.map((r, j) => (
              inInPath(path, i, j)
                ? <SelectedCell key={j}>{r}</SelectedCell>
                : <Cell key={j}>{r}</Cell>
            ))}
          </tr>
        ))}
      </tbody>
    </Matrix>
  );
};

export default AlignmentMatrix;
