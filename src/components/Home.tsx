import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';

export interface initPost {
    title: string;
    url: string;
    created_at: Date;
    author: string;
}

interface Column {
    id: 'title' | 'url' | 'created_at' | 'author';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'url', label: 'URL', minWidth: 100 },
    {
      id: 'created_at',
      label: 'Created at',
      minWidth: 170,
    },
    {
      id: 'author',
      label: 'Author',
      minWidth: 170,
    },
  ];  

const Home: React.FC = () => {
    const [page, setPage] = useState<number>(0);
    const [post, setPost] = useState<initPost[]>([]);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        setInterval(()=> {
            getPost();

        }, 10000);
    },[])

    const getPost = async () => {
        try{
            setLoading(true);
            const res = await fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0')
            const data = await res.json();
            setPost(data.hits);
            setTotalElements(data.nbHits);
            setLoading(false);
        }catch(error) {
            setLoading(false);
            console.log(error)
        }
    }

    const handleChangePage = () => {
        
    }
    return (
        <div>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {post.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={totalElements}
        rowsPerPage={20}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
        </div>
    );
};

export default Home;