import { useEffect } from "react";
import { Link } from "react-router-dom";
import useRoomStore from "../stores/roompublic.stores";
import { LoaderCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

function StaySuite_Homes_Public() {
    const { rooms, fetchRooms, loading, error } = useRoomStore();

    useEffect(() => {
        fetchRooms();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoaderCircle className="animate-spin text-black" size={32} />
            </div>
        );
    }
    if (error) return <p>Error loading rooms: {error}</p>;

    return (
        <section className="pt-28 pb-24 flex items-start flex-col mx-auto lg:container space-y-8">
            <Breadcrumb id="onboarding">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Breadcrumb>Onboarding</Breadcrumb>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Hotel Rooms</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="grid xs:grid-cols-2 lg:grid-cols-4 gap-6">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <Link to={`/homes/room/${room._id}`} key={room._id} className="space-y-3">
                            <div className="rounded-lg overflow-hidden select-none">
                                <img
                                    src={room.room_details[0]?.room_images[0]?.media_files[0]?.file_url || ""}
                                    className="aspect-square object-cover"
                                    alt={room.room_details[0]?.room_title || "Room Image"}
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="block">{room.room_details[0]?.room_title}</span>
                                {/* <p>Slot Availability: {room.slot_availability}</p> */}
                                <span className="block font-bold">
                                    PHP {room.room_details[0]?.initial_price_per_night?.toFixed(2) || "0.00"}
                                </span>
                                <div className="space-x-1"> 
                                    {room.room_details[0]?.amenities_offer?.slice(0, 2).map((amenity) => (
                                        <Badge key={amenity._id} className="rounded-full">
                                            {amenity.amenities_name}
                                        </Badge>
                                    ))}
                                    {room.room_details[0]?.amenities_offer?.length > 3 && (
                                        <Badge variant="outline" className="rounded-full">+{room.room_details[0].amenities_offer.length - 2} Amenities</Badge>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No rooms available</p>
                )}
            </div>
        </section>
    )
}

export default StaySuite_Homes_Public;
