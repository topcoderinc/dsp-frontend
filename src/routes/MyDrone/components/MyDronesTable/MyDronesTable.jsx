import React, {PropTypes, Component} from 'react';
import CSSModules from 'react-css-modules';
import {Link} from 'react-router';
import Pagination from 'components/Pagination';
import SelectPerPage from 'components/SelectPerPage';
import ModalConfirm from 'components/ModalConfirm';
import styles from './MyDronesTable.scss';

/*
* MyDronesTable
*/
export class MyDronesTable extends Component {
  constructor(props) {
    super(props);

    this.openModalConfirm = this.openModalConfirm.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);

    this.state = {
      modalIsOpen: false,
      droneIdToDelete: '',
    };
  }

  openModalConfirm(droneIdToDelete) {
    this.setState({modalIsOpen: true, droneIdToDelete});
  }

  handleCloseModal() {
    this.setState({modalIsOpen: false});
  }

  handleConfirmClick() {
    this.props.deleteDrone(this.state.droneIdToDelete);
    this.setState({modalIsOpen: false});
  }

  render() {
    const {currentTab, updateDroneTable, availableDrones, onMissionDrones, offset, limit, sortBy} = this.props;
    const drones = currentTab === 'available' ? availableDrones : onMissionDrones;
    const dronesTypeText = currentTab === 'available' ? 'available drones' : 'drones on mission';
    const noDronesText = currentTab === 'available' ? 'No drones available' : 'No drones on mission';

    const displayFrom = offset + 1;
    const displayTo = Math.min(offset + limit, drones.total);

    return (
      <div styleName="my-drones-table">
        <ModalConfirm
          title="Confirm drone deleting"
          message="Are you sure you want to delete this drone?"
          isOpen={this.state.modalIsOpen}
          onClose={this.handleCloseModal}
          onConfirm={this.handleConfirmClick}
        />
        {drones.total ?
          (
            <div>
              <div styleName="table-head">
                <div styleName="display">Displaying {displayFrom} - {displayTo} of <span>{drones.total}</span> {dronesTypeText}:</div>
              </div>

              <div styleName="react-table">
                <table styleName="table">
                  <thead styleName="thead">
                    <tr styleName="tr">
                      <th><div styleName="th-inner">Image</div></th>
                      <th>
                        <div
                          styleName={sortBy === '-serialNumber' ? 'th-inner--sort-desc' : 'th-inner--sort-asc'}
                          onClick={() => {
                            updateDroneTable({sortBy: sortBy === '-serialNumber' ? 'serialNumber' : '-serialNumber'});
                          }}
                        >
                          Drone Serial Number
                        </div>
                      </th>
                      <th>
                        <div
                          styleName={sortBy === '-name' ? 'th-inner--sort-desc' : 'th-inner--sort-asc'}
                          onClick={() => {
                            updateDroneTable({sortBy: sortBy === '-name' ? 'name' : '-name'});
                          }}
                        >
                          Drone Name
                        </div>
                      </th>
                      <th>
                        <div
                          styleName={sortBy === '-type' ? 'th-inner--sort-desc' : 'th-inner--sort-asc'}
                          onClick={() => {
                            updateDroneTable({sortBy: sortBy === '-type' ? 'type' : '-type'});
                          }}
                        >
                          Drone Type
                        </div>
                      </th>
                      <th>
                        <div
                          styleName={sortBy === '-mileage' ? 'th-inner--sort-desc' : 'th-inner--sort-asc'}
                          onClick={() => {
                            updateDroneTable({sortBy: sortBy === '-mileage' ? 'mileage' : '-mileage'});
                          }}
                        >
                          Mileage
                        </div>
                      </th>
                      <th><div styleName="th-inner" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {drones.items.map((drone) => (
                      <tr styleName="tr" key={drone.id}>
                        <td>
                          <div styleName="td-inner">
                            {drone.thumbnailUrl ?
                              (
                                <img src={`${window.location.origin}${drone.thumbnailUrl}`} alt="Drone preview" width="148" height="95" />
                              ) : (
                                <div styleName="no-image" />
                              )
                            }
                          </div>
                        </td>
                        <td><div styleName="td-inner"><Link to={`/drone-details/${drone.id}`}>{drone.serialNumber}</Link></div></td>
                        <td><div styleName="td-inner">{drone.name}</div></td>
                        <td><div styleName="td-inner">{drone.type}</div></td>
                        <td><div styleName="td-inner">{drone.mileage}</div></td>
                        <td>
                          <div styleName="td-inner">
                            <ul styleName="actions">
                              <li>
                                <Link to={`/drone-details/${drone.id}`} styleName="view-detail">View-Detail</Link>
                              </li>
                              <li>
                                <Link to={`/edit-drones/${drone.id}`} styleName="edit">Edit</Link>
                              </li>
                              <li>
                                <div styleName="delete" onClick={() => this.openModalConfirm(drone.id)}>Delete</div>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div styleName="navigation">
                <div styleName="perpage">
                  <SelectPerPage
                    value={limit}
                    onChange={({value}) => {
                      updateDroneTable({limit: value});
                    }}
                  />
                </div>
                <div styleName="pagination">
                  <Pagination
                    forcePage={Math.ceil(offset / limit)}
                    pageCount={Math.ceil(drones.total / limit)}
                    onPageChange={({selected}) => {
                      updateDroneTable({offset: Math.ceil(selected * limit)});
                    }}
                  />
                </div>
              </div>

            </div>
          ) : (
            <div styleName="no-drones">{noDronesText}</div>
          )
        }
      </div>
    );
  }
}

MyDronesTable.propTypes = {
  currentTab: PropTypes.string.isRequired,
  updateDroneTable: PropTypes.func.isRequired,
  availableDrones: PropTypes.object.isRequired,
  onMissionDrones: PropTypes.object.isRequired,
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  deleteDrone: PropTypes.func.isRequired,
};

export default CSSModules(MyDronesTable, styles);
