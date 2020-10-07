import React from 'react';
import './Table.scss';

import organizeData from '../../utils/organizeDataForTable';
import Button from '../Button';
import { connect } from 'react-redux';
import { RootState } from '../../redux';
import { User } from '../../services/Authentication.service';
import { profile } from 'console';

export interface TableHeader {
  key: string;
  value: string;
  right?: boolean;
}

declare interface TableProps {
  headers: TableHeader[];
  data: any[];

  enableActions?: boolean;

  onDelete?: (item: any) => void;
  onDetail?: (item: any) => void;
  onEdit?: (item: any) => void;

  profile?: User;
}

const Table: React.FC<TableProps> = (props) => {
  const [organizedData, indexedHeaders] = organizeData(props.data, props.headers);

  const isLoggedIn = !!props.profile?._id;

  return <table className="AppTable">
    <thead>
      <tr>
        {
          props.headers.map(header =>
            <th
              className={header.right ? 'right' : ''}
              key={header.key}>
              {header.value}
            </th>
          )
        }
        {
          props.enableActions
          && <th className="right">
            Actions
            </th>
        }
      </tr>
    </thead>

    <tbody>
      {
        organizedData.map((row, i) => {
          return <tr key={i}>
            {
              Object
                .keys(row)
                .map((item, i) =>
                  item !== '$original'
                    ? <td
                      key={row.$original._id + i}
                      className={indexedHeaders[item].right ? 'right' : ''}
                    >
                      {row[item]}
                    </td>
                    : null
                )
            }

            {
              props.enableActions &&
              <td className="actions right">
                {
                  isLoggedIn
                    ? props.onEdit &&
                    <Button
                      onClick={() => props.onEdit && props.onEdit(row.$original)}
                    >
                      Edit
                    </Button>
                    : null
                }
                {
                  props.onDetail &&
                  <Button
                    onClick={() => props.onDetail && props.onDetail(row.$original)}
                  >
                    Detail
                  </Button>
                }
                {
                  isLoggedIn
                    ? props.onDelete &&
                    <Button
                      onClick={() => props.onDelete && props.onDelete(row.$original)}
                    >
                      Delete
                  </Button>
                    : null
                }
              </td>
            }
          </tr>
        })
      }
    </tbody>
  </table>
}

const mapStateToProps = (state: RootState) => ({
  profile: state.authetication?.profile
});

export default connect(mapStateToProps)(Table);